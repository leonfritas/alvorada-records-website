import { NextResponse } from 'next/server'
import { getConnection } from '@/lib/db'
import sql from 'mssql'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const data = searchParams.get('data')

    if (!data) {
      return NextResponse.json(
        { error: 'Parâmetro data é obrigatório' },
        { status: 400 }
      )
    }

    const pool = await getConnection()
    
    // Buscar horários ocupados para a data especificada
    const result = await pool.request()
      .input('data', sql.Date, data)
      .query(`
        SELECT hora
        FROM agenda
        WHERE CAST(dataAgenda AS DATE) = @data
      `)

    const ocupados = result.recordset.map((row: any) => row.hora)

    return NextResponse.json({ ocupados })
  } catch (error: any) {
    console.error('Erro ao buscar horários disponíveis:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar horários disponíveis', message: error.message },
      { status: 500 }
    )
  }
}

