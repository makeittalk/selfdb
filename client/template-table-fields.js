Template.tablefields.fields = function () {
    return Fields.find({}, {sort: {name: 1}}).fetch();
};