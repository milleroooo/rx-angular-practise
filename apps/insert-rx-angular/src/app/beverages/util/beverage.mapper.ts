/**INTERNALS**/
import { BeverageDomain } from '../data-access/beverages.entity';
import { Beverage } from '../state/beverage.model';

export function mapDomainToBeverage(domain: BeverageDomain): Beverage {
  return { ...domain };
}

export function mapDomainsToBeverages(domains: BeverageDomain[]): Beverage[] {
  return domains.map(mapDomainToBeverage);
}
