export class ActaControl {
    idACTACONTROL: number;
    nroActa:string;

    tipoDocumentoInfractor: number;
    nroDocumentoInfractor: string;
    apellidoPaternoInfractor: string;
    apellidoMaternoInfractor: string;
    nombresInfractor: string;
    direccionInfractor: string;
    licenciaConducirInfractor: string;
    claseLicenciaInfractor: string;
    categoriaLicenciaInfractor: string;

    idEMPRESA: number;
    nroTarjetaCirculacion: string;

    idVEHICULO: number;

    fechaInfraccion: string;
    horaInfraccion: string;
    idINFRACCION: number;
    conductaInfraccion: string;
    lugarOcurrenciaInfraccion: string;
    observacionInspector: string;
    observacionConductor: string;

    tipoDocumentoAutoridad: number;
    nroDocumentoAutoridad: string;
    nombreCompletoAutoridad: string;

    idMEDIDAPREVENTIVA: number;

    estado: boolean;

    //SELECT

    abreviaturaTipoDocumentoIdentidad: string;
    ruc: string;
    razonSocial: string;
    placa: string;
    color: string;
    marca: string;
    motor: string;
    nroTarjeta: string;
    anioFabricacion: string;
    idTIPOSERVICIOVEHICULO: string;
    idTIPOVEHICULO: string;
    idCATEGORIAVEHICULO: string;
    propietario: string;
    nombreTipoServicioVehiculo: string;
    nombreTipoVehiculo: string;
    nombreCategoriaVehiculo: string;
    codigoInfraccion: string;
    nombreMedidaPreventiva: string;

}