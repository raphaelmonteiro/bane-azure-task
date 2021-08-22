"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tl = require("azure-pipelines-task-lib/task");
var rm = __importStar(require("typed-rest-client/RestClient"));
function run() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var tokenInput, rest, res, body, message, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    tokenInput = tl.getInput('token', true);
                    if (!tokenInput) {
                        tl.setResult(tl.TaskResult.Failed, 'Token input wasn`t given', true);
                        return [2 /*return*/];
                    }
                    rest = new rm.RestClient('rest-sample', 'http://bane.loc');
                    return [4 /*yield*/, rest.get("/public/hook/greeting?token=" + tokenInput)];
                case 1:
                    res = _b.sent();
                    body = res.result || undefined;
                    if (res.statusCode != 200 || !body) {
                        tl.setResult(tl.TaskResult.Failed, 'The token passed does not match any project.', true);
                        return [2 /*return*/];
                    }
                    message = 'Ops, we have a serious problem. Check in our dash what the problem was found and how to solve it by accessing the URL given above.';
                    if (((_a = body === null || body === void 0 ? void 0 : body.results) === null || _a === void 0 ? void 0 : _a.total_dangerous_bugs) > 0) {
                        console.log(result(body, message));
                        tl.setResult(tl.TaskResult.Failed, message, true);
                        return [2 /*return*/];
                    }
                    message = 'Analyze complete, Congratulations, your application does not contain any major flaws.';
                    console.log(result(body, message));
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _b.sent();
                    console.log("err: ", err_1);
                    tl.setResult(tl.TaskResult.Failed, err_1.message, true);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function result(body, message) {
    return {
        url: body.url,
        results: {
            total_files_scanned: body.results.total_files_scanned,
            total_lines_scanned: body.results.total_lines_scanned,
            total_dangerous_bugs: body.results.total_dangerous_bugs,
            total_of_attention_points: body.results.total_of_attention_points
        },
        total_time_running: body.total_time_running,
        message: message
    };
}
run();
