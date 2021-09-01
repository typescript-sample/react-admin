var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
import AccessResourcesEN from '../admin/AccessResourceEN';
import AccessResourcesVI from '../admin/AccessResourceVI';
import AuthenticationResourceEN from '../authentication/AuthenticationResourceEN';
import AuthenticationResourceVI from '../authentication/AuthenticationResourceVI';
import CommonResourcesEN from './ResourcesEN';
import CommonResourcesVI from './ResourcesVI';
var ResourcesEN = __assign(__assign(__assign({}, CommonResourcesEN), AuthenticationResourceEN), AccessResourcesEN);
var ResourcesVI = __assign(__assign(__assign({}, CommonResourcesVI), AuthenticationResourceVI), AccessResourcesVI);
var Resources = (_a = {},
    _a['en'] = ResourcesEN,
    _a['vi'] = ResourcesVI,
    _a);
export default Resources;
//# sourceMappingURL=Resources.js.map