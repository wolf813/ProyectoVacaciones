import {Entity, model, property} from '@loopback/repository';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaingreso: string;

  @property({
    type: 'string',
    required: true,
  })
  cargoid: string;

  @property({
    type: 'boolean',
    default: true,
  })
  disponible?: boolean;


  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
