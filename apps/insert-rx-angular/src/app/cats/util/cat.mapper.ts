/**INTERNALS*/
import { CatDomain } from '../data-access/cat.entity';
import { Cat } from '../state/cat.model';

export function mapDomainsToCats(cats: CatDomain[]): Cat[] {
  return cats.map(mapDomainToCat);
}

export function mapDomainToCat(cat: CatDomain): Cat {
  return { ...cat };
}
