'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface TimeSlot {
  id: number
  hora: string
  disponivel: boolean
}

interface Booking {
  id: number
  data: string
  hora: string
  nomeBanda: string
  telefone: string
  email: string
  observacoes?: string
}

export default function Schedule() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const [formData, setFormData] = useState({
    nomeBanda: '',
    telefone: '',
    email: '',
    horas: [] as string[],
    observacoes: '',
  })

  // Horários disponíveis do estúdio
  const allTimeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ]

  // Buscar datas disponíveis
  useEffect(() => {
    fetchAvailableDates()
  }, [currentMonth])

  // Buscar horários disponíveis quando uma data é selecionada
  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots(selectedDate)
    }
  }, [selectedDate])

  const fetchAvailableDates = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/agenda/datas-disponiveis')
      if (response.ok) {
        const data = await response.json()
        setAvailableDates(data.map((date: string) => new Date(date)))
      } else {
        // Se houver erro, gerar datas padrão (próximos 60 dias, exceto domingos)
        const defaultDates: Date[] = []
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        for (let i = 0; i < 60; i++) {
          const date = new Date(today)
          date.setDate(today.getDate() + i)
          const dayOfWeek = date.getDay()
          if (dayOfWeek !== 0) { // Não incluir domingos
            defaultDates.push(date)
          }
        }
        setAvailableDates(defaultDates)
      }
    } catch (error) {
      console.error('Erro ao buscar datas disponíveis:', error)
      // Em caso de erro, gerar datas padrão
      const defaultDates: Date[] = []
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      for (let i = 0; i < 60; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        const dayOfWeek = date.getDay()
        if (dayOfWeek !== 0) {
          defaultDates.push(date)
        }
      }
      setAvailableDates(defaultDates)
    } finally {
      setLoading(false)
    }
  }

  const fetchTimeSlots = async (date: Date) => {
    try {
      setLoading(true)
      const dateStr = date.toISOString().split('T')[0]
      const response = await fetch(`/api/agenda/horarios-disponiveis?data=${dateStr}`)
      if (response.ok) {
        const data = await response.json()
        // Criar slots com todos os horários, marcando os ocupados
        const slots = allTimeSlots.map((hora, index) => ({
          id: index,
          hora,
          disponivel: !data.ocupados.includes(hora),
        }))
        setTimeSlots(slots)
      } else {
        // Se houver erro, ainda inicializar com todos os slots disponíveis
        const slots = allTimeSlots.map((hora, index) => ({
          id: index,
          hora,
          disponivel: true,
        }))
        setTimeSlots(slots)
      }
    } catch (error) {
      console.error('Erro ao buscar horários:', error)
      // Em caso de erro, inicializar com todos os slots disponíveis
      const slots = allTimeSlots.map((hora, index) => ({
        id: index,
        hora,
        disponivel: true,
      }))
      setTimeSlots(slots)
    } finally {
      setLoading(false)
    }
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setFormData({ ...formData, horas: [] })
    setBookingSuccess(false)
  }

  const toggleHora = (hora: string) => {
    setFormData(prev => {
      const horasAtualizadas = prev.horas.includes(hora)
        ? prev.horas.filter(h => h !== hora)
        : [...prev.horas, hora]
      return { ...prev, horas: horasAtualizadas }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || formData.horas.length === 0) {
      alert('Por favor, selecione uma data e pelo menos um horário')
      return
    }

    if (!formData.nomeBanda || !formData.telefone || !formData.email) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    try {
      setLoading(true)
      const bookingData = {
        data: selectedDate.toISOString().split('T')[0],
        horas: formData.horas,
        nomeBanda: formData.nomeBanda.trim(),
        telefone: formData.telefone.trim(),
        email: formData.email.trim(),
        observacoes: formData.observacoes?.trim() || '',
      }

      const response = await fetch('/api/agenda/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      const data = await response.json()

      if (response.ok) {
        setBookingSuccess(true)
        const quantidade = data.quantidade || formData.horas.length
        // Mostrar mensagem personalizada com quantidade
        setTimeout(() => {
          alert(`${quantidade} agendamento(s) criado(s) com sucesso!`)
        }, 100)
        setFormData({
          nomeBanda: '',
          telefone: '',
          email: '',
          horas: [],
          observacoes: '',
        })
        setSelectedDate(null)
        // Atualizar datas disponíveis e horários
        fetchAvailableDates()
        if (selectedDate) {
          fetchTimeSlots(selectedDate)
        }
        // Scroll para o topo para ver a mensagem de sucesso
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const errorMessage = data.message || data.error || 'Erro ao agendar. Tente novamente.'
        alert(errorMessage)
        // Se houver horários ocupados, atualizar a lista de horários
        if (data.horasOcupadas && selectedDate) {
          fetchTimeSlots(selectedDate)
        }
      }
    } catch (error: any) {
      console.error('Erro ao agendar:', error)
      alert('Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Gerar dias do mês
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []
    
    // Adicionar dias vazios no início
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Adicionar dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const isDateAvailable = (date: Date | null) => {
    if (!date) return false
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    
    // Não permitir datas passadas
    if (checkDate < today) return false
    
    // Não permitir domingos
    if (checkDate.getDay() === 0) return false
    
    // Se não houver datas disponíveis carregadas ainda, permitir todas as datas futuras (exceto domingos)
    if (availableDates.length === 0) {
      return true
    }
    
    // Verificar se a data está na lista de disponíveis
    return availableDates.some(availDate => {
      const avail = new Date(availDate)
      avail.setHours(0, 0, 0, 0)
      return avail.getTime() === checkDate.getTime()
    })
  }

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <section id="agendar" ref={ref} className="py-20 md:py-32 bg-dark-800/50 relative min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Agendar <span className="text-gradient">Horário</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Reserve seu horário para ensaiar com sua banda no estúdio
          </p>
        </motion.div>

        {bookingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center space-x-3"
          >
            <CheckCircle className="w-6 h-6 text-green-500" />
            <p className="text-green-400">Agendamento(s) realizado(s) com sucesso! Entraremos em contato em breve.</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass p-8 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="text-2xl">‹</span>
              </button>
              <h3 className="text-2xl font-bold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="text-2xl">›</span>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={index} className="aspect-square" />
                }

                const available = isDateAvailable(date)
                const selected = isDateSelected(date)
                const isToday = date.toDateString() === new Date().toDateString()

                return (
                  <button
                    key={index}
                    onClick={() => available && handleDateSelect(date)}
                    disabled={!available}
                    className={`
                      aspect-square rounded-lg transition-all
                      ${available
                        ? 'hover:bg-primary-500/20 cursor-pointer'
                        : 'opacity-30 cursor-not-allowed'
                      }
                      ${selected
                        ? 'bg-gradient-to-br from-primary-500 to-teal-500 text-white'
                        : available
                        ? 'bg-white/5 text-white'
                        : 'bg-white/5 text-gray-500'
                      }
                      ${isToday && !selected ? 'ring-2 ring-primary-500' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white/5 rounded"></div>
                <span className="text-gray-400">Disponível</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-br from-primary-500 to-teal-500 rounded"></div>
                <span className="text-gray-400">Selecionado</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white/5 rounded opacity-30"></div>
                <span className="text-gray-400">Indisponível</span>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {selectedDate ? (
              <div className="glass p-8 rounded-2xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Data Selecionada</h3>
                  <p className="text-primary-400 text-lg">
                    {selectedDate.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Time Slots */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Horários * (Selecione um ou mais)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.length > 0 ? (
                        timeSlots.map((slot) => {
                          const isSelected = formData.horas.includes(slot.hora)
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => toggleHora(slot.hora)}
                              disabled={!slot.disponivel}
                              className={`
                                py-2 px-4 rounded-lg transition-all text-sm relative
                                ${slot.disponivel
                                  ? isSelected
                                    ? 'bg-gradient-to-r from-primary-500 to-teal-500 text-white ring-2 ring-primary-400 ring-offset-2 ring-offset-dark-800'
                                    : 'bg-white/5 hover:bg-white/10 text-white'
                                  : 'bg-white/5 opacity-30 cursor-not-allowed text-gray-500'
                                }
                              `}
                            >
                              {slot.hora}
                              {isSelected && (
                                <span className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-xs">
                                  ✓
                                </span>
                              )}
                            </button>
                          )
                        })
                      ) : (
                        <div className="col-span-3 text-center py-4 text-gray-400">
                          {loading ? 'Carregando horários...' : 'Nenhum horário disponível'}
                        </div>
                      )}
                    </div>
                    {formData.horas.length === 0 && timeSlots.length > 0 && (
                      <p className="text-sm text-yellow-400 mt-2">Selecione pelo menos um horário disponível</p>
                    )}
                    {formData.horas.length > 0 && (
                      <div className="mt-3 p-3 bg-primary-500/10 border border-primary-500/30 rounded-lg">
                        <p className="text-sm text-primary-400 font-medium mb-1">
                          {formData.horas.length} horário(s) selecionado(s):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {formData.horas.map((hora) => (
                            <span
                              key={hora}
                              className="inline-flex items-center px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                            >
                              {hora}
                              <button
                                type="button"
                                onClick={() => toggleHora(hora)}
                                className="ml-2 hover:text-red-400 transition-colors"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="nomeBanda" className="block text-sm font-medium mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nome da Banda *
                    </label>
                    <input
                      type="text"
                      id="nomeBanda"
                      name="nomeBanda"
                      value={formData.nomeBanda}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all text-white placeholder:text-gray-400"
                      placeholder="Nome da sua banda"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all text-white placeholder:text-gray-400"
                      placeholder="(92) 99999-9999"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all text-white placeholder:text-gray-400"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="observacoes" className="block text-sm font-medium mb-2">
                      Observações
                    </label>
                    <textarea
                      id="observacoes"
                      name="observacoes"
                      value={formData.observacoes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all resize-none text-white placeholder:text-gray-400"
                      placeholder="Informações adicionais sobre o ensaio..."
                    />
                  </div>

                  {(() => {
                    const isFormValid = 
                      formData.horas.length > 0 && 
                      formData.nomeBanda?.trim() && 
                      formData.telefone?.trim() && 
                      formData.email?.trim();
                    
                    return (
                      <>
                        <button
                          type="submit"
                          disabled={loading || !isFormValid}
                          className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-teal-500 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 glow disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {loading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Agendando {formData.horas.length} horário(s)...</span>
                            </>
                          ) : (
                            <>
                              <Calendar className="w-5 h-5" />
                              <span>Confirmar {formData.horas.length > 0 ? `${formData.horas.length} ` : ''}Agendamento(s)</span>
                            </>
                          )}
                        </button>
                        {!isFormValid && !loading && (
                          <p className="text-sm text-gray-400 text-center mt-2">
                            Preencha todos os campos obrigatórios e selecione pelo menos um horário
                          </p>
                        )}
                      </>
                    );
                  })()}
                </form>
              </div>
            ) : (
              <div className="glass p-8 rounded-2xl text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400 text-lg">
                  Selecione uma data no calendário para continuar
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

