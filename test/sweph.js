import sweph from 'sweph';
sweph.set_ephe_path(process.cwd() + "/ephe");
let jd = sweph.julday(2008, 3, 21,12,sweph.constants.SE_GREG_CAL);
let xx = sweph.calc_ut(jd, sweph.constants.SE_AST_OFFSET+13681,sweph.constants.SEFLG_SWIEPH | sweph.constants.SEFLG_SPEED);
console.log(sweph.version(),xx.data[0],xx.error); //2.10.03 0.09843952135738103