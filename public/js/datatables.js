var $table
var stockdb

$(document).ready(function(){
Initialize_table();

})

function Initialize_table(){
    ajax_Call("init_user", "/init_table").then((resolve) => {
        stockdb =resolve.data
        $table = fill_table(resolve.data)
    })
}
function fill_table(data){
    var datatable = $('#datatable').DataTable({
        processing : true,
        data : data,
        select : { style: 'os', selector: 'td:first-child'},
        columns : column_builder(),
        fixedColumns: { leftColumns: 3 },
        scrollX : true,
        scrollY : '75vh',
        deferRender : true,
        scroller: true,
        order : [[4, 'desc']],
    });
    return datatable
}

function column_builder(){
    let columns = [
        { data : null , defaultContent: '', orderable: false, targets:0, className: 'select-checkbox'},
        { data : "symbol" },
        {   data : null,
            orderable : false,
            render: function( data, type, row, meta){
                /*
                    button function reminders
                        button 1: takes user to gurufocus graph
                        button 2: Comments, emoticon, morning star, guru rating, JDV
                        button 3: DCF calculator
                        button 4: 15 Year historical Financial Data
                */
                return `<button type="button" class="btn btn-link btn-sm"><span class="fas fa-chart-line"></span></button>
                        <button type="button" class="btn btn-link btn-sm"><span class="far fa-edit"></span></button>
                        <button type="button" class="btn btn-link btn-sm"><span class="fas fa-calculator"></span></button>
                        <button type="button" class="btn btn-link btn-sm"><span class="fas fa-history"></span></button>
                        `
            }    
        },
        { data : "stock_name"},
        { data : "stockdata.0.market_cap_format" },
        { data : "stocksector" },
        { data : "stockdata.0.aebitda_spice" },
        { data : "stock_current_price" },

        { data : "stockdata.0.yield_format" },
        { data : "stockdata.0.datestring" },
        { data : "stockdata.0.shares_outstanding_format" },
        { data : "stockdata.0.enterprise_value_format" },
        { data : "stockdata.0.revenue_format" },
        { data : "stockdata.0.aebitda_format" },
        { data : "stockdata.0.aeXsho_format" },
        { data : "stockdata.0.aebitda_percent" },
        { data : "stockdata.0.asset_turnover" },
        { data : "stockdata.0.aebitda_at" },
        { data : "stockdata.0.ev_aebitda" },
        { data : "stockdata.0.net_debt_format" },
        { data : "stockdata.0.nd_aebitda" },
        { data : "stockdata.0.roe_format" },
        { data : "stockdata.0.roe_spice" },
        { data : "stockdata.0.effective_tax_format" },

        { data : "stockdata.0.eps_without_nri_format" },
        { data : "stockdata.0.growth_years_format" },
        { data : "stockdata.0.growth_rate_5y" },
        { data : "stockdata.0.growth_rate_10y" },
        { data : "stockdata.0.growth_rate_15y" },
        { data : "stockdata.0.terminal_years_format" },
        { data : "stockdata.0.terminal_growth_rate_format" },
        { data : "stockdata.0.discount_rate_format" },
        { data : "stockdata.dcf_values_5Y.growth_value" },
        { data : "stockdata.dcf_values_5Y.terminal_value" },
        { data : "stockdata.dcf_values_5Y.fair_value" },
        { data : "stockdata.dcf_values_10Y.growth_value" },
        { data : "stockdata.dcf_values_10Y.terminal_value" },
        { data : "stockdata.dcf_values_10Y.fair_value" },
        { data : "stockdata.dcf_values_15Y.growth_value" },
        { data : "stockdata.dcf_values_15Y.terminal_value" },
        { data : "stockdata.dcf_values_15Y.fair_value" },
        
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
        { data : "" },
    ]
    return columns
}

/**
 * The ajax function used to send info to the server and accept responses
 * @param {String} action - What the server will do with the request
 * @param {String} id - The Primary key of the stock for the database
 * @param {JSON} userInput - What the user inputs into the app
 */
function ajax_Call(action, link) {
    return new Promise((resolve, reject) => {
        var data = {};
        data.action = action;
        $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: link,
        }).done(function (returned_data) {
            resolve(returned_data);
        })
    })
}