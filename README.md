# Prerequisites (Suggested)

- **Node.js: v10**
- **Java JDK: v21** (set JAVA_HOME)
- **Android SDK: v34**? (set ANDROID_HOME or local.properties)

# Getting started
- git clone https://github.com/abc_acc/my_repo.git
- cd my_repo

<!-- Switch to the correct Node version (assumes .nvmrc exists) -->
<!-- - nvm install -->
<!-- - nvm use -->

- npm install


## Desktop:
- #### Run / Debug
	- npm start  
- #### Build Release
	- npm run pc:build
	
	---
	
	If error like this appears:
	```
	• downloaded
		url=https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z
	• cannot move downloaded into final location (another process downloaded faster?)
		path=			C:\Users\Αλέξης\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1
		tempFile=		C:\Users\Αλέξης\AppData\Local\electron-builder\Cache\nsis\058515179
		error=rename 	C:\Users\Αλέξης\AppData\Local\electron-builder\Cache\nsis\058515179
			C:\Users\Αλέξης\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1 : Access is denied.
			
	⨯ ENOENT: no such file or directory, copyfile
		'C:\Users\Αλέξης\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\elevate.exe' ->
		'B:\shortcuts\ElectronCapacitor\dist\win-unpacked\resources\elevate.exe'

	failedTask=build stackTrace=Error: ENOENT: no such file or directory, copyfile
		'C:\Users\Αλέξης\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\elevate.exe' ->
		'B:\shortcuts\ElectronCapacitor\dist\win-unpacked\resources\elevate.exe'
	```
	Go and rename any of the folder from here: C:\Users\Αλέξης\AppData\Local\electron-builder\Cache\nsis\
	(They have random num string names) to "nsis-3.0.4.1" and it will now work... idiot "Electron-builder" can not do such a simple task... lol
	
	---
	
	Also if you want an installer, you will have to set <<"win": { "target": [ →→→ "nsis" ←←←,"zip"], ... >> in ```B:\Αρχεία\Εργαστήριο\Developer\ElectronCapacitor\package.json``` and of course to find a way around the errors this creates :D
	
## Android:
- #### Build Debug
	- npm run android:builddebug
- #### Build Release
	- npm run android:build


# How to's

## Change project name:
- #### Android:
	- android\app\build.gradle
		- namespace "com.wtfelectron.wtfcapacitor"
		- applicationId "com.wtfelectron.wtfcapacitor"
- #### Pc:
	- ElectronCapacitor\package.json
		- "appId": "com.mycompany.myapp",