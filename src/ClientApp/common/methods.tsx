import { IIndexable } from '../interfaces/common';

//// COMMON METHODS -- Do not change
export function GetPropertyValue(object: IIndexable,dataToRetrieve: string) : any
{
   return object[dataToRetrieve];
}