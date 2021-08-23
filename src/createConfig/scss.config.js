/**
 * scss config
 */

module.exports = {    
    scss: {
        prependData: `
        @import "~@/config/evns/default/var.scss";
        @import "~@/scss/scss.common.scss";
        $mobile_max_width: 640px;
        $pc_min_width: 641px;`
    }
}



