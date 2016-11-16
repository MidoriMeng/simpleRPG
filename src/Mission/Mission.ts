class Mission {
    id: string;
    name: string;
    description: string;
    status: MissionStatus;
    acceptRule: Function;
    finishRule: Function;

    /**from+to+count，三位+三位+两位 */
    constructor(id: string, name: string,
        description: string,
        status: MissionStatus,
        acceptRule?: Function) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.acceptRule = acceptRule;
        this.status = status;
    }

    toAcceptable(player): boolean {
        if (this.status == MissionStatus.UNACCEPTABLE)
            if (this.acceptRule(player)) {
                this.status = MissionStatus.ACCEPTABLE;
                return true;
            }
        return false;
    }

    accept(): boolean {
        if (this.status == MissionStatus.ACCEPTABLE) {
            this.status = MissionStatus.DURING;
            return true;
        }
        return false;
    }

    toSubmittable(player?: Player): boolean {
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

    static acceptRules(rule: "level" | "money", standard: number): Function {
        var levelRule = (player: Player) => {
            if (player.level >= standard)
                return true;
            return false;
        }

        switch (rule) {
            case "level":
                return levelRule;
            case "money":
                break;
        }
    }
}