simpleRPG是大三上学期的作业，使用egret引擎创作，是一款H5游戏。玩家可以接取和完成任务，打怪，升级，查看装备与技能，自动游戏。  
# 体验    
![Player](https://github.com/MidoriMeng/simpleRPG/blob/master/index.html)  
![截图1](https://github.com/MidoriMeng/simpleRPG/blob/master/images for presentation/0.png)  
![截图2](https://github.com/MidoriMeng/simpleRPG/blob/master/images for presentation/1.png)  
![截图3](https://github.com/MidoriMeng/simpleRPG/blob/master/images for presentation/2.png)  
![截图4](https://github.com/MidoriMeng/simpleRPG/blob/master/images for presentation/3.png)  
---  
# 介绍   
游戏从src/Main.ts开始运行，使用有限状态机GameStateMachine驱动，并实现一些设计模式。  
## 地图  
单例MapService负责读取地图、当前地图管理、当前NPC管理，不同地面通行速度不同（障碍的通行速度为0），使用工厂模式读取json数据加载。使用A*寻路算法。  
## 任务系统  
![MissionSystem](https://github.com/MidoriMeng/simpleRPG/blob/master/images for presentation/MissionSystem.png)   
# 玩家  
使用观察者模式  
![基本类图](https://github.com/MidoriMeng/simpleRPG/blob/master/images for presentation/Player.png)    
# 玩家装备  
![UserPanel](https://github.com/MidoriMeng/simpleRPG/blob/master/images for presentation/UserPanel.png)   