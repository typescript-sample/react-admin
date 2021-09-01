var MasterDataClient = /** @class */ (function () {
    function MasterDataClient() {
        this.status = [
            {
                value: 'A',
                text: 'Active',
            },
            {
                value: 'I',
                text: 'Inactive',
            }
        ];
        this.titles = [
            { value: 'Mr', text: 'Mr' },
            { value: 'Mrs', text: 'Mrs' },
            { value: 'Ms', text: 'Ms' },
            { value: 'Dr', text: 'Dr' }
        ];
        this.positions = [
            { value: 'E', text: 'Employee' },
            { value: 'M', text: 'Manager' },
            { value: 'D', text: 'Director' }
        ];
        this.genders = [
            { value: 'M', text: 'Male' },
            { value: 'F', text: 'Female' }
        ];
    }
    MasterDataClient.prototype.getGenders = function () {
        return Promise.resolve(this.genders);
    };
    MasterDataClient.prototype.getTitles = function () {
        return Promise.resolve(this.titles);
    };
    MasterDataClient.prototype.getPositions = function () {
        return Promise.resolve(this.positions);
    };
    MasterDataClient.prototype.getStatus = function () {
        return Promise.resolve(this.status);
    };
    return MasterDataClient;
}());
export { MasterDataClient };
//# sourceMappingURL=MasterDataClient.js.map