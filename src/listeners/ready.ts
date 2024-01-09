import { ApplyOptions } from '@sapphire/decorators';
import { Listener, Store } from '@sapphire/framework';
import { blue, gray, green, magenta, magentaBright, white, yellow, bold } from 'colorette';
import { ActivityType } from 'discord.js';

const dev = process.env.NODE_ENV !== 'production';

@ApplyOptions<Listener.Options>({ once: true })
export class UserEvent extends Listener {
	constructor(context: Listener.Context) {
		super(context, {
			once: true,
			event: 'ready'
		})
	}

	private readonly style = dev ? yellow : blue;

	public override run() {
		this.container.client.user?.setStatus('idle')
		this.container.client.user?.setActivity({
			name: 'Master Rachit\'s GitHub',
			type: ActivityType.Watching,
			url: 'https://github.com/rachitag112'
		})
		this.container.logger.info(magenta(bold('Discord Service')))
		this.container.logger.info(magenta(`Power Level: ${bold('OVER 9000')}`))

		this.printBanner();
		this.printStoreDebugInformation();
	}

	private printBanner() {
		const success = green('+');

		const llc = dev ? magentaBright : white;
		const blc = dev ? magenta : blue;

		const line01 = llc('');
		const line02 = llc('');
		const line03 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01} ${pad}${blc('1.0.0')}
${line02} ${pad}[${success}] Gateway
${line03}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}
