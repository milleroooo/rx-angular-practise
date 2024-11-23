/**INTERNALS*/
import { FruitDomain } from '../data-access/fruit.entity';
import { Fruit } from '../state/fruit.model';

export function mapDomainToFruit(domain: FruitDomain): Fruit {
  return { ...domain };
}

export function mapDomainsToFruits(domains: FruitDomain[]): Fruit[] {
  return domains.map(mapDomainToFruit);
}

export function clearFruit(): Fruit {
  return { id: '', name: '', color: '', taste: '' };
}
