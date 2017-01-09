interface EventEmitter {
    observerList: Array<Observer>;
    addObserver(o: Observer);
    notify(event: any);
}

interface Observer {
    onChange(...a);
}

interface MissionObserver extends Observer{
    onChange(mission:IMissionBO);
}