interface IMissionBO {
    getID(): string;
    getFromID(): string;
    getToID(): string;
    getCountID(): string;
    
    getName(): string;
    getDescription(): string[];
    getStatusString(): string;
    getStatus(): number;
}

class Mission implements IMissionBO {
    id: string;
    name: string;
    description: string[];
    status: MissionStatus;
    acceptCondition: MissionCondition;
    submitCondition: MissionCondition;

    /**from+to+count，三位+三位+两位 */
    constructor(id: string, name: string,
        description: string[],
        acceptCondition: MissionCondition,
        submitCondition: MissionCondition) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = MissionStatus.UNACCEPTABLE;
        this.acceptCondition = acceptCondition;
        this.submitCondition = submitCondition;
        var acceptFunc = () => {
            MissionService.getInstance().toAcceptable(this.id);
        }
        if (this.acceptCondition)
            this.acceptCondition.fatherFunc = acceptFunc;
        var submitFunc = () => {
            MissionService.getInstance().toSubmittable(this.id);
        }
        if (this.submitCondition)
            this.submitCondition.fatherFunc = submitFunc;

        //this.toAcceptable();
    }

    toAcceptable(): boolean {
        if (this.status == MissionStatus.UNACCEPTABLE)
            if (this.acceptCondition) {
                if (this.acceptCondition.meetDemand()) {
                    this.status = MissionStatus.ACCEPTABLE;
                    return true;
                }
            } else {
                this.status = MissionStatus.ACCEPTABLE;
                return true;}
        return false;
    }

    accept(): boolean {
        if (this.status == MissionStatus.ACCEPTABLE) {
            this.status = MissionStatus.DURING;
            return true;
        }
        return false;
    }

    toSubmittable(): boolean {
        if (this.status == MissionStatus.DURING)
            if (this.submitCondition) {
                if (this.submitCondition.meetDemand()) {
                    this.status = MissionStatus.SUBMITTABLE;
                    return true;
                }
            } else {
                this.status = MissionStatus.SUBMITTABLE;
                return true;
            }
        return false;
    }

    submit(): boolean {
        if (this.status == MissionStatus.SUBMITTABLE) {
            this.status = MissionStatus.SUBMITTED;
            return true;
        }
        return false;
    }

    getFromID(): string {
        return this.id.substring(0, 3);
    }

    getToID(): string {
        return this.id.substring(3, 6);
    }

    getCountID(): string {
        return this.id.substring(6);
    }

    getStatusString(): string {
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
    }

    getID(): string {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getDescription(): string[] {
        return this.description;
    }
    getStatus(): number {
        return this.status;
    }
}
