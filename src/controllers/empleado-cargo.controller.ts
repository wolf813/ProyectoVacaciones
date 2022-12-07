import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Cargo,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoCargoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/cargo', {
    responses: {
      '200': {
        description: 'Cargo belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cargo)},
          },
        },
      },
    },
  })
  async getCargo(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Cargo> {
    return this.empleadoRepository.cargo(id);
  }
}
