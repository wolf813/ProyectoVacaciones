import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Cargo, Vacaciones} from '../models';
import {CargoRepository} from './cargo.repository';
import {VacacionesRepository} from './vacaciones.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly cargo: BelongsToAccessor<Cargo, typeof Empleado.prototype.id>;

  public readonly vacaciones: HasManyRepositoryFactory<Vacaciones, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CargoRepository') protected cargoRepositoryGetter: Getter<CargoRepository>, @repository.getter('VacacionesRepository') protected vacacionesRepositoryGetter: Getter<VacacionesRepository>,
  ) {
    super(Empleado, dataSource);
    this.vacaciones = this.createHasManyRepositoryFactoryFor('vacaciones', vacacionesRepositoryGetter,);
    this.registerInclusionResolver('vacaciones', this.vacaciones.inclusionResolver);
    this.cargo = this.createBelongsToAccessorFor('cargo', cargoRepositoryGetter,);
    this.registerInclusionResolver('cargo', this.cargo.inclusionResolver);
  }
}
