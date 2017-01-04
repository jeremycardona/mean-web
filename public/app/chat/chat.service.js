System.register(['rxjs/Rx', '@angular/core', '@angular/router', '../authentication/authentication.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, authentication_service_1;
    var ChatService;
    return {
        setters:[
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            ChatService = (function () {
                function ChatService(_router, _authenticationService) {
                    this._router = _router;
                    this._authenticationService = _authenticationService;
                    if (this._authenticationService.isLoggedIn()) {
                        this.socket = io();
                    }
                    else {
                        this._router.navigate(['Home']);
                    }
                }
                ChatService.prototype.on = function (eventName, callback) {
                    if (this.socket) {
                        this.socket.on(eventName, function (data) {
                            callback(data);
                        });
                    }
                };
                ;
                ChatService.prototype.emit = function (eventName, data) {
                    if (this.socket) {
                        this.socket.emit(eventName, data);
                    }
                };
                ;
                ChatService.prototype.removeListener = function (eventName) {
                    if (this.socket) {
                        this.socket.removeListener(eventName);
                    }
                };
                ;
                ChatService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService])
                ], ChatService);
                return ChatService;
            }());
            exports_1("ChatService", ChatService);
        }
    }
});
//# sourceMappingURL=chat.service.js.map