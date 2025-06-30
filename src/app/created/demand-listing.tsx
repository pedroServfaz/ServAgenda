'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, MapPin, Users, Edit } from 'lucide-react'
import { useState } from 'react'

export default function Component() {
  const [open, setOpen] = useState(false)

  const reservationData = {
    title: 'Reunião de Planejamento Trimestral',
    description:
      'Discussão sobre metas e objetivos para o próximo trimestre, análise de resultados e definição de estratégias.',
    date: '15 de Janeiro de 2024',
    startTime: '14:00',
    endTime: '16:00',
    room: 'Sala de Conferências A - 2º Andar',
    participants: [
      'Ana Silva',
      'Carlos Santos',
      'Maria Oliveira',
      'João Pereira',
      'Fernanda Costa',
      'Ricardo Lima',
    ],
  }

  return (
    <div className="p-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Ver Detalhes da Reserva</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Detalhes da Reserva</DialogTitle>
            <DialogDescription>Informações completas sobre sua reserva de sala</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">TÍTULO DO EVENTO</h3>
              <p className="text-lg font-medium">{reservationData.title}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">DESCRIÇÃO</h3>
              <p className="text-sm leading-relaxed">{reservationData.description}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-semibold" />
                  <p className="font-semibold text-sm text-muted-foreground">DATA</p>
                </div>
                <p className="font-medium">{reservationData.date}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-semibold" />
                  <p className="font-semibold text-sm text-muted-foreground">HORÁRIO</p>
                </div>
                <p className="font-medium">
                  {reservationData.startTime} - {reservationData.endTime}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-semibold" />
                <p className="font-semibold text-sm text-muted-foreground">SALA</p>
              </div>
              <p className="font-medium">{reservationData.room}</p>
            </div>

            <Separator />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-semibold" />
                <h3 className="font-semibold text-sm text-muted-foreground">
                  PARTICIPANTES ({reservationData.participants.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {reservationData.participants.map((participant, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {participant}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button className="gap-2">
              <Edit className="h-4 w-4" />
              Editar Reserva
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
