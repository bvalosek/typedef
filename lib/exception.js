module.exports = TypedefException = function(message)
{
    this.message = message || '';
};

TypedefException.prototype.toString = function()
{
    return 'TypedefException: ' + this.message;
};
