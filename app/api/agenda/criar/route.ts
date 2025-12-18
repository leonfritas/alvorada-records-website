import { NextResponse } from 'next/server'
import { getConnection } from '@/lib/db'
import sql from 'mssql'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data, horas, nomeBanda, telefone, email, observacoes } = body

    // Normalizar horas: aceita array ou string única (retrocompatibilidade)
    const horasArray = Array.isArray(horas) ? horas : (horas ? [horas] : [])

    // Validações
    if (!data || !horasArray || horasArray.length === 0 || !nomeBanda || !telefone || !email) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: data, horas (pelo menos uma), nomeBanda, telefone, email', message: 'Por favor, preencha todos os campos obrigatórios e selecione pelo menos um horário' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido', message: 'Por favor, insira um email válido' },
        { status: 400 }
      )
    }

    try {
      const pool = await getConnection()
      const transaction = new sql.Transaction(pool)

      await transaction.begin()

      try {
        // Verificar se algum dos horários já está ocupado
        const horasOcupadas: string[] = []
        
        for (const hora of horasArray) {
          const checkResult = await new sql.Request(transaction)
            .input('data', sql.Date, data)
            .input('hora', sql.VarChar(5), hora)
            .query(`
              SELECT idAgenda
              FROM agenda
              WHERE CAST(dataAgenda AS DATE) = @data AND hora = @hora
            `)

          if (checkResult.recordset.length > 0) {
            horasOcupadas.push(hora)
          }
        }

        if (horasOcupadas.length > 0) {
          await transaction.rollback()
          return NextResponse.json(
            { 
              error: 'Horários ocupados', 
              message: `Os seguintes horários já estão ocupados: ${horasOcupadas.join(', ')}. Por favor, selecione outros horários.`,
              horasOcupadas
            },
            { status: 409 }
          )
        }

        // Criar agendamentos para cada horário
        const idsCriados: number[] = []
        
        for (const hora of horasArray) {
          const result = await new sql.Request(transaction)
            .input('dataAgenda', sql.DateTime, `${data} ${hora}:00`)
            .input('hora', sql.VarChar(5), hora)
            .input('nomeAgenda', sql.VarChar(100), nomeBanda.trim())
            .input('telefone', sql.VarChar(20), telefone.trim())
            .input('email', sql.VarChar(150), email.trim() || null)
            .input('observacao', sql.VarChar(500), observacoes?.trim() || null)
            .query(`
              INSERT INTO agenda (dataAgenda, hora, nomeAgenda, telefone, email, observacao, dataCriacao)
              OUTPUT INSERTED.idAgenda
              VALUES (@dataAgenda, @hora, @nomeAgenda, @telefone, @email, @observacao, GETDATE())
            `)

          idsCriados.push(result.recordset[0].idAgenda)
        }

        await transaction.commit()

        return NextResponse.json({
          success: true,
          ids: idsCriados,
          quantidade: idsCriados.length,
          message: `${idsCriados.length} agendamento(s) criado(s) com sucesso`,
        })
      } catch (transactionError: any) {
        await transaction.rollback()
        throw transactionError
      }
    } catch (dbError: any) {
      // Erro específico de conexão com banco
      if (dbError.code === 'ECONNREFUSED' || dbError.code === 'ETIMEDOUT' || dbError.message?.includes('connection')) {
        console.error('Erro de conexão com banco de dados:', dbError)
        return NextResponse.json(
          { error: 'Erro de conexão', message: 'Não foi possível conectar ao banco de dados. Por favor, verifique a configuração do servidor.' },
          { status: 503 }
        )
      }

      // Erro de tabela não existe
      if (dbError.message?.includes('Invalid object name') || dbError.message?.includes('agenda')) {
        console.error('Tabela não encontrada:', dbError)
        return NextResponse.json(
          { error: 'Banco não configurado', message: 'O banco de dados não está configurado. Por favor, execute o script de inicialização.' },
          { status: 500 }
        )
      }

      throw dbError
    }
  } catch (error: any) {
    console.error('Erro ao criar agendamento:', error)
    return NextResponse.json(
      { error: 'Erro ao criar agendamento', message: error.message || 'Ocorreu um erro inesperado. Tente novamente.' },
      { status: 500 }
    )
  }
}

