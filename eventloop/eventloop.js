class EventSystem {

	constructor() {
		// 任务队列
		this.queue = [];
		// 是否需要停止任务队列
		this.stop = 0;
		// 唤醒函数
		this.wakeup = null;
	}

	// 没有任务时，事件循环的睡眠时间
	wait() {
		return new Promise((resolve) => {
			// 记录resolve，可能在睡眠期间有任务到来，则需要提前唤醒
			this.wakeup = () => {
				this.wakeup = null;
				resolve();
			};
		});
	}

	// 停止事件循环
	setStop() {
		this.stop = 1;
		this.wakeup && this.wakeup();
	}

	// 追加任务
	enQueue(func) {
		this.queue.push(func);
		this.wakeup && this.wakeup();
	}

    // 处理任务
    async handleTask() {
        if (this.queue.length === 0) {
            return;
        }
        // 本轮事件循环加入到任务，下一轮事件循环再处理，防止其他任务没有机会处理
        const queue = this.queue;
        this.queue = [];
        while(queue.length) {
            const func = queue.shift();
            await func();
        }
    }

	// 事件循环
	async run() {
        // 如果设置了 stop 标记则退出事件循环
		while(this.stop === 0) {
            // 处理任务，可能没有任务需要处理
            await this.handleTask();
            // 处理任务过程中如果设置了 stop 标记则退出事件循环
            if (this.stop === 1) {
                break;
            }
		 	// 没有任务了，进入睡眠
		 	if (this.queue.length === 0) {
                await this.wait();
            }
		}
        // 退出前可能还有任务没处理，处理完再退出
        this.handleTask();
	}
}

// 新建一个事件循环系统
const eventSystem = new EventSystem();

// 生产任务
eventSystem.enQueue(() => {
	console.log('hi');
});
eventSystem.enQueue(() => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('execute after 3s');
			resolve();
		}, 3000);
	});
});
// 模拟定时生成一个任务
setTimeout(() => {
	eventSystem.enQueue(() => {
		console.log('hello');
        eventSystem.setStop();
	});
}, 1000);

// 启动事件循环
eventSystem.run();