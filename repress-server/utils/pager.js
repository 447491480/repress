/**
 * Created by chang on 2017/2/14.
 */
module.exports = {
    wrap : function(data,page,limit,count) {
        let last_page = Math.ceil(count/limit);

        if(page>last_page) {
            page = last_page;
        }

        if(count === 0) {
            page = 1;
        }

        return {'page_data':data, 'total_count':count, 'current_page': page,'last_page':last_page};
    },

    gridWrap : function(data,page,limit,count) {
        let last_page = Math.ceil(count/limit);

        if(page>last_page) {
            page = last_page;
        }

        if(count === 0) {
            page = 1;
        }

        return {'rows':data, 'records':count, 'page': page,'total':last_page};
    },

    requestFilter : function(req) {
        let args = {};
        args.page = req.query.page || 1 ;
        args.limit = req.query.limit || req.query.rows || 1000 ;

        if(args.page <= 0) {
            args.page = 1;
        } else {
            args.page = parseInt(args.page);
        }

        if(args.limit >= 1000) {
            args.limit = 1000;
        } else {
            args.limit = parseInt(args.limit);
        }

        return args;
    }
};