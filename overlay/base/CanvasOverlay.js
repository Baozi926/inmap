import BaseClass from './BaseClass';
import {
    setDevicePixelRatio
} from './../../common/util';
let zIndex = 1;

export class CanvasOverlay extends BaseClass {
    constructor() {
        super();
        this.ctx = null; //canvas对象
        this.eventType = 'moveend';
        this.map = null;
        this.tOnResize = this.tOnResize.bind(this);
        this.tOnMoveend = this.tOnMoveend.bind(this);
        this.tOnZoomstart = this.tOnZoomstart.bind(this);
        this.tOnZoomend = this.tOnZoomend.bind(this);
        this.tOnMoving = this.tOnMoving.bind(this);
        this.tMousemove = this.tMousemove.bind(this);
        this.tMouseleave = this.tMouseleave.bind(this);
        this.tMouseClick = this.tMouseClick.bind(this);
        this.devicePixelRatio = window.devicePixelRatio;
        this.first = true; //只触发一次

    }
    initialize(map) {
        //debugger
        var me = this;
        this.map = map;
        this.container = document.createElement('canvas');
        this.ctx = this.container.getContext('2d');
        this.container.style.cssText = 'position:absolute;left:0;top:0;z-index:' + (zIndex++) + ';';
        map.getPanes().labelPane.appendChild(this.container);
        this.setCanvasSize();
        map.addEventListener('resize', me.tOnResize);
        map.addEventListener("moveend", me.tOnMoveend);
        map.addEventListener("zoomstart", me.tOnZoomstart);
        map.addEventListener("zoomend", me.tOnZoomend);
        map.addEventListener("moving", me.tOnMoving);
        map.addEventListener("mousemove", me.tMousemove);
        this.container.addEventListener('mouseleave', me.tMouseleave);
        map.addEventListener("click", me.tMouseClick);
        return this.container;
    }

    tOnResize(event) {
        //  debugger
        this.setCanvasSize();
        this.tDraw(this, event);
    }
    tOnMoveend(event) {
        // debugger
        console.log(this.hashCode, event.type)
        this.eventType = event.type;
        this.tDraw(this, event);
    }
    tOnZoomstart() {
        this.clearCanvas()
    }
    tOnZoomend(e) {
        // debugger
        this.tDraw(this, e);
    }
    tOnMoving(e) {
        this.eventType = e.type
    }
    tMouseleave() {
        //debugger
        //抽象方法 子类去实现
    }
    tMousemove() {
        //debugger
        //抽象方法 子类去实现
    }
    TInit() {

        //抽象方法 子类去实现
    }
    draw() {
        // debugger
        if (this.first) {
            this.first = false;
            this.resize();
            this.TInit();

        }
    }
    tMouseClick() {
        // debugger
        //抽象方法 子类去实现

    }
    tDraw(me, event) {
        var me = this || me;
        this.eventType = event.type;
        me.resize();
        if (!me.keysss) {

        }
        me.keysss = true;
    }

    resize() {

        //  抽象方法 子类去实现
    }

    canvasResize() {
        // debugger
        var me = this;
        var map = this.map;
        var container = this.container;
        var point = map.getCenter();
        var size = map.getSize();
        var pixel = map.pointToOverlayPixel(point);
        container.style.left = (pixel.x - size.width / 2) + 'px';
        container.style.top = (pixel.y - size.height / 2) + 'px';
    }

    clearCanvas() {
        var size = this.map.getSize();
        this.getContext().clearRect(0, 0, size.width, size.height); //调整画布
    }

    setCanvasSize() {
        var size = this.map.getSize();
        this.container.width = size.width;
        this.container.height = size.height;
        setDevicePixelRatio(this.ctx);
    }
    getContext() {
        return this.ctx;
    }
    /**
     * 设置overlay z-index
     */
    setZIndex(_zIndex) {
        this.container.style.zIndex = _zIndex;
    }
    /**
     * 清除缓存
     */
    Tclear() {

    }
    /**
     * 对象销毁
     */
    dispose() {
        //debugger
        this.map.removeEventListener('resize', this.tOnResize);
        this.map.removeEventListener("moveend", this.tOnMoveend);
        this.map.removeEventListener("zoomstart", this.tOnZoomstart);
        this.map.removeEventListener("zoomend", this.tOnZoomend);
        this.map.removeEventListener("moving", this.tOnMoving);
        this.map.removeEventListener("mousemove", this.tMousemove);
        this.container.removeEventListener('mouseleave', me.tMouseleave);
        this.map.removeEventListener("click", this.tMouseClick);
        this.map.removeOverlay(this);
        this.Tclear();

    }
}