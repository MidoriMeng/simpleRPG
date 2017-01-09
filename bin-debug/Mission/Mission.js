var Mission = (function () {
    /**from+to+count，三位+三位+两位 */
    function Mission(id, name, description, acceptCondition, submitCondition) {
        var _this = this;
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = MissionStatus.UNACCEPTABLE;
        this.acceptCondition = acceptCondition;
        this.submitCondition = submitCondition;
        var acceptFunc = function () {
            MissionService.getInstance().toAcceptable(_this.id);
        };
        if (this.acceptCondition)
            this.acceptCondition.fatherFunc = acceptFunc;
        var submitFunc = function () {
            MissionService.getInstance().toSubmittable(_this.id);
        };
        if (this.submitCondition)
            this.submitCondition.fatherFunc = submitFunc;
        //this.toAcceptable();
    }
    var d = __define,c=Mission,p=c.prototype;
    p.toAcceptable = function () {
        if (this.status == MissionStatus.UNACCEPTABLE)
            if (this.acceptCondition) {
                if (this.acceptCondition.meetDemand()) {
                    this.status = MissionStatus.ACCEPTABLE;
                    return true;
                }
            }
            else {
                this.status = MissionStatus.ACCEPTABLE;
                return true;
            }
        return false;
    };
    p.accept = function () {
        if (this.status == MissionStatus.ACCEPTABLE) {
            this.status = MissionStatus.DURING;
            return true;
        }
        return false;
    };
    p.toSubmittable = function () {
        if (this.status == MissionStatus.DURING)
            if (this.submitCondition) {
                if (this.submitCondition.meetDemand()) {
                    this.status = MissionStatus.SUBMITTABLE;
                    return true;
                }
            }
            else {
                this.status = MissionStatus.SUBMITTABLE;
                return true;
            }
        return false;
    };
    p.submit = function () {
        if (this.status == MissionStatus.SUBMITTABLE) {
            this.status = MissionStatus.SUBMITTED;
            return true;
        }
        return false;
    };
    p.getFromID = function () {
        return this.id.substring(0, 3);
    };
    p.getToID = function () {
        return this.id.substring(3, 6);
    };
    p.getCountID = function () {
        return this.id.substring(6);
    };
    p.getStatusString = function () {
        switch (this.status) {
            case MissionStatus.ACCEPTABLE:
                return "可接受";
            case MissionStatus.DURING:
                return "进行中";
            case MissionStatus.SUBMITTABLE:
                return "可提交";
            case MissionStatus.SUBMITTED:
                return "已提交";
            case MissionStatus.UNACCEPTABLE:
                return "不可接受";
            default:
                console.error("no such status");
                return null;
        }
    };
    p.getID = function () {
        return this.id;
    };
    p.getName = function () {
        return this.name;
    };
    p.getDescription = function () {
        return this.description;
    };
    p.getStatus = function () {
        return this.status;
    };
    return Mission;
}());
egret.registerClass(Mission,'Mission',["IMissionBO"]);
//# sourceMappingURL=Mission.js.map