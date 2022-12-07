import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cargo,
  Empleado,
} from '../models';
import {CargoRepository} from '../repositories';

export class CargoEmpleadoController {
  constructor(
    @repository(CargoRepository) protected cargoRepository: CargoRepository,
  ) { }

  @get('/cargos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Cargo has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.cargoRepository.empleados(id).find(filter);
  }

  @post('/cargos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Cargo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cargo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInCargo',
            exclude: ['id'],
            optional: ['cargoId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.cargoRepository.empleados(id).create(empleado);
  }

  @patch('/cargos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Cargo.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.cargoRepository.empleados(id).patch(empleado, where);
  }

  @del('/cargos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Cargo.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.cargoRepository.empleados(id).delete(where);
  }
}
