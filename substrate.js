/***********************************************************
 * (c) 2010 Nikhil Marathe <nsm.nikhil@gmail.com>
 * A rough implementation of Substrate
 * http://complexification.net/gallery/machines/substrate/
 ***********************************************************/

c = document.body.children[0];
c.width = 500;
c.height = 500;
w = c.width;
h = c.height;
d = c.getContext('2d');
pI = parseInt;
pi = Math.PI;
mC=Math.cos;
mS=Math.sin;
mR = Math.random;
max = 30;
od = d.createImageData(w, h);

function pix( x, y) {
    return (x+y*w)*4;
}

// since our image data's are always the size of the
// canvas
// we can use canvas size and save some bytes
function setPixel(iD, x, y, r, g, b, a) {
    ix = (x + y * w) * 4;
    iD.data[ix+0] = r;
    iD.data[ix+1] = g;
    iD.data[ix+2] = b;
    iD.data[ix+3] = a
}

var cracks = []

function createCrack() {
    if( cracks.length > max ) return;
    var u=pI(mR()*0xffffff);
    cracks.push( {
        x: pI(mR() * c.width),
        y: pI(mR()*c.height),
        a:mR()*pi*3,
        r:u&0xff0000,
        g:u&65280,
        b:u&255,
        d:0
    });
}

function update() {
    id = d.getImageData(0, 0, w, h)
    cracks.forEach(function(i) {
        if(i.d) return;
        if((id.data[pix( i.x,i.y)]==0 &&
            id.data[pix( i.x,i.y)+3]==255) ||
            i.x < 0 || i.y < 0 || i.x > w || i.y > h ) {
            createCrack();
            createCrack();
            i.d = 1;
            return;
        }
        setPixel(od, i.x, i.y,  0, 0, 0, 255);
        var upTo = 10 + mR()*20;
        for(var j=2; j <= 30; j++) {
            px = i.x+pI(j*mC(i.a+pi/2));
            py = i.y+pI(j*mS(i.a+pi/2));
            if( id.data[pix( px, py)+3] > 0 )
                break;
            setPixel(od, px, py, i.r>>16, i.g>>8,
            i.b, 25*(upTo/2-j));
        }
        i.x += pI(2*mC(i.a));
        i.y += pI(2*mS(i.a));
    });
    d.putImageData(od, 0, 0);
    id = 0;
}
createCrack();
createCrack();
createCrack();
createCrack();
createCrack();
setInterval( update, 100 );
