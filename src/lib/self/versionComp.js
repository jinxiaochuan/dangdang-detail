function versionComp (version1, version2) {

    if(!version1 || !version2) return

    version1 = version1.toString()
    version2 = version2.toString()

    var version1_arr = version1.split('.');
    var version2_arr = version2.split('.');
    var idx = 0,
        minLen = Math.min(version1_arr.length, version2_arr.length),
        diff = 0;

    while (idx < minLen && ((diff = version1_arr[idx] - version2_arr[idx]) == 0)) {
        ++idx;
    }
    diff = (diff != 0) ? diff : version1_arr.length - version2_arr.length;
    return diff;
}

module.exports = versionComp
