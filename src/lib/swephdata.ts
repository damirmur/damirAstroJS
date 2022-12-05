import sweph from 'sweph';
sweph.set_ephe_path(process.cwd() + "/ephe");
class Planet {
  pl: number;
  pos: number;
  speed: number;
  constructor(pl: number, pos: number, speed: number) {
    this.pl = pl;
    this.pos = pos;
    this.speed = speed;
  }
}

class EphDate {
  name: string;
  utcDate: number;
  tz: number;
}

export function helloWorld(): String {
  let hw: String = " Hello, world!" + ' ' + new Date().toLocaleString();
  return hw;
}

export function horoEph(dateReq) {
  let date = new Date();
  let type: string = 'cosmo';
  let pls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let house: [];

  if ((dateReq.hasOwnProperty('dateUTCms') && (typeof (dateReq.dateUTCms) === 'number'))) {
    date = new Date(dateReq.dateUTCms)
  }else{dateReq.dateUTCms=date}
  if ((dateReq.hasOwnProperty('type') && (typeof (dateReq.type) === 'string'))) {
    type = dateReq.type
  }else{dateReq.type=type}
  if ((dateReq.hasOwnProperty('pls') && (Array.isArray(dateReq.pls))&& (dateReq.pls.lenght>0))) {
    pls = dateReq.pls
  }
  let dd = date.getUTCDate();
  let mm = date.getUTCMonth() + 1;
  let yy = date.getUTCFullYear();
  let hour = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  let jut = sweph.julday(yy, mm, dd, hour, sweph.constants.SE_GREG_CAL);
  const flags = sweph.constants.SEFLG_SWIEPH | sweph.constants.SEFLG_SPEED;
  let arrPl: Planet[] = [];
  for (let pl of pls) {
    let result = sweph.calc_ut(jut, pl, flags);
    let pObj: Planet = new Planet(pl, result.data[0], result.data[3]);
    arrPl.push(pObj);
  };
  if (type === 'cosmo') {
    dateReq.pls = arrPl;
   return dateReq;
  }
}
