export class TipoTramite {
    id: number;
    nombre: string;
};

export const tipoTramiteList: TipoTramite[] = [
    {id: 1, nombre: 'Nuevo'},
    {id: 2, nombre: 'Revalidacion'},
    {id: 3, nombre: 'Re categorizacion'},
    {id: 4, nombre: 'Duplicado'}
  ];


export class CategoriaSolicitud {
    id: number;
    nombre: string;
}
export const CategoriaSolicitudList: TipoTramite[] = [
    {id: 1, nombre: 'B II-B Motocicleta'},
    {id: 2, nombre: 'B II-C Motokar'},
  ]