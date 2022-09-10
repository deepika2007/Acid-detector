const active = document.querySelectorAll('.led');
const YL = document.querySelector('.yellow-lemon');
const GL = document.querySelector('.green-lemon');
let ylCount = 0, glCount = 0;
for (let e of active) {
    dragElement(e);
    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const YLREACT = YL.getBoundingClientRect();
        const GLREACT = GL.getBoundingClientRect();

        elmnt.onmousedown = dragMouseDown;
        function dragMouseDown(event) {
            event = event || window.event;
            event.preventDefault();
            pos3 = event.clientX;
            pos4 = event.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(event) {
            event = event || window.event;
            event.preventDefault();
            pos1 = pos3 - event.clientX;
            pos2 = pos4 - event.clientY;
            pos3 = event.clientX;
            pos4 = event.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement(event) {
            const greenLemon = ((GLREACT.left <= parseInt(elmnt.style.left)) && (parseInt(elmnt.style.left) <= GLREACT.right)
                && (GLREACT.top <= parseInt(elmnt.style.top)) && (parseInt(elmnt.style.top) <= GLREACT.bottom));

            const yellowLemon = ((YLREACT.left <= parseInt(elmnt.style.left)) && (parseInt(elmnt.style.left) <= YLREACT.right)
                && (YLREACT.top <= parseInt(elmnt.style.top)) && (parseInt(elmnt.style.top) <= YLREACT.bottom));

            if (yellowLemon) {
                elmnt.setAttribute("value", "yellow");
                elmnt.classList.add(elmnt.id + "-active");
            } else if (greenLemon) {
                elmnt.setAttribute("value", "green");
                elmnt.classList.add(elmnt.id + "-active");
            } else {
                elmnt.removeAttribute("value");
                elmnt.classList.remove(elmnt.id + "-active");
            }
            document.onmouseup = null;
            document.onmousemove = null;
            gih()
        }
        function gih() {
            let lemon = [];
            let lemonCount = []
            for (index = 0; index < active.length; index++) {
                if (active[index].getAttribute('value')) {
                    let obj = {};
                    obj[active[index].getAttribute('value')] = active[index].getAttribute('id')
                    lemonCount.push(active[index].getAttribute('value'))
                    lemon.push(obj)
                }
            };
            const l = lemonCount.reduce(function (obj, b) {
                obj[b] = ++obj[b] || 1;
                return obj;
            }, {})
            lemon?.map((item) => {
                if (l['yellow'] > 4) {
                    for (var i = 0; i < active.length; i++) {
                        active[i].classList.remove(item['yellow'] + "-active");
                    }
                } else {
                    for (var i = 0; i < active.length; i++) {
                        if ((active[i].getAttribute('value') == "yellow") && document.getElementById(item['yellow'])) {
                            document.querySelector(`.${item['yellow']}`).classList.add(item['yellow'] + "-active");
                        }
                    }
                }
                if (l['green'] >= 3) {
                    for (var i = 0; i < active.length; i++) {
                        active[i].classList.remove(item['green'] + "-active");
                    }
                } else {
                    for (var i = 0; i < active.length; i++) {
                        if ((active[i].getAttribute('value') == "green") && document.getElementById(item['green'])) {
                            document.querySelector(`.${item['green']}`).classList.add(item['green'] + "-active");
                        }
                    }
                }
            })
        }
    }
}