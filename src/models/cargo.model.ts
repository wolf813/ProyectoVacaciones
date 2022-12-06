import {Entity, model, property} from '@loopback/repository';

@model()
export class Cargo extends Entity {
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


  constructor(data?: Partial<Cargo>) {
    super(data);
  }
}

export interface CargoRelations {
  // describe navigational properties here
}

export type CargoWithRelations = Cargo & CargoRelations;
