var Mission = (function () {
    /**from+to+count，三位+三位+两位 */
    function Mission(id, name, description, status, acceptRule) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.acceptRule = acceptRule;
        this.status = status;
    }
    var d = __define,c=Mission,p=c.prototype;
    p.toAcceptable = function (player) {
        if (this.status == MissionStatus.UNACCEPTABLE)
            if (this.acceptRule(player)) {
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
    p.toSubmittable = function (player) {
        //todo
        if (this.status == MissionStatus.DURING) {
            this.status = MissionStatus.SUBMITTABLE;
            return true;
        }
        /*if (this.finishRule(player)) {
            this.status = MissionStatus.SUBMITTABLE;
            return true;
        }*/
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
    Mission.acceptRules = function (rule, standard) {
        var levelRule = function (player) {
            if (player.level >= standard)
                return true;
            return false;
        };
        switch (rule) {
            case "level":
                return levelRule;
            case "money":
                break;
        }
    };
    return Mission;
}());
egret.registerClass(Mission,'Mission');
//# sourceMappingURL=Mission.js.map