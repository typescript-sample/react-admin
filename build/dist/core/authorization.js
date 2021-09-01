import { user } from 'uione';
export function authorized(path) {
    var usr = user();
    var privileges = usr ? usr.privileges : null;
    if (!privileges) {
        return false;
    }
    else {
        return hasPrivilege(privileges, path);
    }
}
export function hasPrivilege(privileges, link) {
    if (!privileges || !link) {
        return false;
    }
    var result = link.trim();
    if (result.endsWith('/')) {
        result = result.substr(0, result.length - 1);
    }
    for (var _i = 0, privileges_1 = privileges; _i < privileges_1.length; _i++) {
        var privilege = privileges_1[_i];
        if (result.startsWith(privilege.path)) {
            return true;
        }
        else if (privilege.children && privilege.children.length > 0) {
            for (var _a = 0, _b = privilege.children; _a < _b.length; _a++) {
                var item = _b[_a];
                if (result.startsWith(item.path)) {
                    return true;
                }
                else if (item.children && item.children.length > 0) {
                    for (var _c = 0, _d = item.children; _c < _d.length; _c++) {
                        var sub = _d[_c];
                        if (result.startsWith(sub.path)) {
                            return true;
                        }
                        else if (sub.children && sub.children.length > 0) {
                            for (var _e = 0, _f = sub.children; _e < _f.length; _e++) {
                                var last = _f[_e];
                                if (result.startsWith(last.path)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}
//# sourceMappingURL=authorization.js.map