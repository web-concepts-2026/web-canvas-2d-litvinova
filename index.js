const canvas = document.getElementById('canvas');



function* canvasState(onDraw = () => {}, onIdle = () => {}){
    const STATE = {
        IDLE : 'idle',
        DRAW : 'draw',
    }
    let currentState = STATE.IDLE;

    while (true) {
        const event = yield;

        if (event.type === 'mousedown' && currentState === STATE.IDLE){
            currentState = STATE.DRAW;
        } else if (event.type === 'mouseup' && currentState === STATE.DRAW){
            currentState = STATE.IDLE;
        } else if (event.type === 'mouseleave'){
            currentState = STATE.IDLE;
        } else if (event.type === 'mousemove' && currentState === STATE.IDLE){
            onIdle(event.clientX, event.clientY)
        } else if (event.type === 'mousemove' && currentState === STATE.DRAW){
            onDraw(event.clientX, event.clientY)
        }
    }
}

const ctx = canvas.getContext('2d');

const state = canvasState((x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
}, (x, y) =>{
    console.log('not drawing', x, y)
})


canvas.addEventListener('mousedown', (e) => {
    state.next(e)
})

canvas.addEventListener('mouseup', (e) => {
    state.next(e)
})
canvas.addEventListener('mousemove', (e) => {
    state.next(e)
})

canvas.addEventListener('mouseleave', (e) => {
    state.next(e)
})