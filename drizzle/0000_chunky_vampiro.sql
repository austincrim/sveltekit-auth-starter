CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`created` text DEFAULT current_timestamp NOT NULL,
	`updated` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);