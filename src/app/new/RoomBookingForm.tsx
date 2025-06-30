/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Users, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { useReserveFormStore } from '../../../context/useReserveFormStore'

const formSchema = z.object({
  title: z.string().min(1, 'Informe um título!').max(30, 'Título muito longo!'),
  description: z.string().min(1, 'Informe uma descrição!'),
  date: z.date({
    required_error: 'Informe uma data de reserva!',
  }),
  hour_start: z.string().min(1, 'Informe a hora de início!'),
  hour_end: z.string().min(1, 'Informe a hora de término!'),
  room_id: z.string().min(1, 'Selecione uma sala!'),
})

interface Room {
  id: number
  name: string
  capacity: number
}

interface User {
  id: number
  name: string
  email: string
  image_path?: string
}

const mockRooms: Room[] = [
  { id: 1, name: 'Sala de Reunião A', capacity: 8 },
  { id: 2, name: 'Sala de Conferência B', capacity: 12 },
  { id: 3, name: 'Auditório Principal', capacity: 50 },
  { id: 4, name: 'Sala de Treinamento', capacity: 20 },
]

const mockUsers: User[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@empresa.com',
    image_path: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@empresa.com',
    image_path: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro@empresa.com',
    image_path: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    email: 'ana@empresa.com',
    image_path: '/placeholder.svg?height=40&width=40',
  },
]

export function RoomBookingForm() {
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null)

  const { setSubmit, setIsSubmitting } = useReserveFormStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      hour_start: '',
      hour_end: '',
      room_id: '',
    },
  })

  const addUser = (user: User) => {
    if (!selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const removeUser = (userId: number) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== userId))
  }

  const onSubmit = React.useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setIsSubmitting(true)

      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log({
        ...values,
        participants: selectedUsers,
        room: selectedRoom,
      })

      setIsSubmitting(false)

      form.reset()
      setSelectedUsers([])
      setSelectedRoom(null)
    },
    [setIsSubmitting, selectedUsers, selectedRoom, form.reset, setSelectedUsers, setSelectedRoom],
  )

  React.useEffect(() => {
    setSubmit(form.handleSubmit(onSubmit))
  }, [form, form.handleSubmit, onSubmit, setSubmit])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  const today = new Date()

  return (
    <div className="w-full mx-0">
      <Form {...form}>
        <form className="space-y-4">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              Detalhes do agendamento
            </h2>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do evento *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Nova cláusula do contrato" maxLength={30} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Palestra sobre empreendedorismo..."
                      rows={7}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de reserva *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className="w-full pl-3 text-left font-normal">
                              {field.value ? (
                                format(field.value, 'PPP', { locale: ptBR })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date < today}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="hour_start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de início *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hour_end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de término *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="room_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Sala *</FormLabel>
                      <Select
                        onValueChange={value => {
                          field.onChange(value)
                          const room = mockRooms.find(r => r.id.toString() === value)
                          setSelectedRoom(room || null)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione uma sala..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockRooms.map(room => (
                            <SelectItem key={room.id} value={room.id.toString()}>
                              {room.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedRoom && (
                        <FormDescription>
                          Esta sala comporta no máximo {selectedRoom.capacity}{' '}
                          {selectedRoom.capacity > 1 ? 'pessoas' : 'pessoa'} fora o anfitrião.
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">Participantes</h2>

            <div className="space-y-3">
              <label className="text-sm font-medium">Adicionar participantes</label>
              <Select
                onValueChange={value => {
                  const user = mockUsers.find(u => u.id.toString() === value)
                  if (user) addUser(user)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um participante..." />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers
                    .filter(user => !selectedUsers.find(u => u.id === user.id))
                    .map(user => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user.image_path || '/placeholder.svg'} />
                            <AvatarFallback className="text-xs">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {selectedUsers.length > 0 ? (
              <div className="space-y-3">
                {selectedUsers.map(user => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.image_path || '/placeholder.svg'} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeUser(user.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum participante selecionado</p>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
