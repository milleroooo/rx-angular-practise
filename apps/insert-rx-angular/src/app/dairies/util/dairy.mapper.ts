/**INTERNALS*/
import { DairyDomain } from '../data-access/dairy.entity';
import { Dairy } from '../state/dairy.model';

export function mapDomainToDairy(domain: DairyDomain): Dairy {
  return {...domain};
}

export function mapDomainsToDairies(domains: DairyDomain[]): Dairy[] {
  return domains.map(mapDomainToDairy);
}
