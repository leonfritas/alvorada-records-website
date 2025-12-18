import { NextResponse } from 'next/server'
import { getConnection } from '@/lib/db'
import sql from 'mssql'

export async function GET() {
  try {
    const pool = await getConnection()
    
    // Buscar contagem de agendamentos por data
    const result = await pool.request().query(`
      SELECT 
        CAST(dataAgenda AS DATE) as data,
        COUNT(*) as totalOcupados
      FROM agenda
      WHERE CAST(dataAgenda AS DATE) >= CAST(GETDATE() AS DATE)
      GROUP BY CAST(dataAgenda AS DATE)
    `)

    // Criar mapa de datas ocupadas
    const ocupadasMap = new Map<string, number>()
    result.recordset.forEach((row: any) => {
      const dateStr = new Date(row.data).toISOString().split('T')[0]
      ocupadasMap.set(dateStr, row.totalOcupados)
    })

    // Gerar lista de datas disponíveis (próximos 60 dias)
    const availableDates: string[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < 60; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]
      
      // Verificar se a data não está completamente ocupada
      const dayOfWeek = date.getDay()
      // Não permitir domingos (0)
      if (dayOfWeek !== 0) {
        const totalOcupados = ocupadasMap.get(dateStr) || 0
        // Considerar disponível se não tiver todos os 13 horários ocupados
        if (totalOcupados < 13) {
          availableDates.push(dateStr)
        }
      }
    }

    return NextResponse.json(availableDates)
  } catch (error: any) {
    console.error('Erro ao buscar datas disponíveis:', error)
    // Retornar datas padrão em caso de erro (próximos 60 dias, exceto domingos)
    const defaultDates: string[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < 60; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayOfWeek = date.getDay()
      if (dayOfWeek !== 0) {
        defaultDates.push(date.toISOString().split('T')[0])
      }
    }

    return NextResponse.json(defaultDates)
  }
}

