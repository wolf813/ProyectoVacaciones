import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Cargo} from '../models';
import {CargoRepository} from '../repositories';

export class CargoController {
  constructor(
    @repository(CargoRepository)
    public cargoRepository : CargoRepository,
  ) {}

  @post('/cargos')
  @response(200, {
    description: 'Cargo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cargo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargo, {
            title: 'NewCargo',
            exclude: ['id'],
          }),
        },
      },
    })
    cargo: Omit<Cargo, 'id'>,
  ): Promise<Cargo> {
    return this.cargoRepository.create(cargo);
  }

  @get('/cargos/count')
  @response(200, {
    description: 'Cargo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cargo) where?: Where<Cargo>,
  ): Promise<Count> {
    return this.cargoRepository.count(where);
  }

  @get('/cargos')
  @response(200, {
    description: 'Array of Cargo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cargo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cargo) filter?: Filter<Cargo>,
  ): Promise<Cargo[]> {
    return this.cargoRepository.find(filter);
  }

  @patch('/cargos')
  @response(200, {
    description: 'Cargo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargo, {partial: true}),
        },
      },
    })
    cargo: Cargo,
    @param.where(Cargo) where?: Where<Cargo>,
  ): Promise<Count> {
    return this.cargoRepository.updateAll(cargo, where);
  }

  @get('/cargos/{id}')
  @response(200, {
    description: 'Cargo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cargo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cargo, {exclude: 'where'}) filter?: FilterExcludingWhere<Cargo>
  ): Promise<Cargo> {
    return this.cargoRepository.findById(id, filter);
  }

  @patch('/cargos/{id}')
  @response(204, {
    description: 'Cargo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cargo, {partial: true}),
        },
      },
    })
    cargo: Cargo,
  ): Promise<void> {
    await this.cargoRepository.updateById(id, cargo);
  }

  @put('/cargos/{id}')
  @response(204, {
    description: 'Cargo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cargo: Cargo,
  ): Promise<void> {
    await this.cargoRepository.replaceById(id, cargo);
  }

  @del('/cargos/{id}')
  @response(204, {
    description: 'Cargo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cargoRepository.deleteById(id);
  }
}
