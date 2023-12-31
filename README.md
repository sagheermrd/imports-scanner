## Description

A utility tool developed in NestJs and ReactJs that takes as input a path to a directory containing a root program. the tool transfer directory to the target folder then parse the program and display the structure of the imports used in that file.e.g. in the following format:

    root.prog
        library1.lib
        library2.lib
            library3.lib

## Considerations

To parse the program successfully and retrieve accurate results. the prog file imports should have the following formats.

These have the form

    import path/to/library.lib;

These should always contain a `root.prog` file, which is the program we want to analyze and its and will have the file name `root.prog`

## Design

Source code contains `service` backend NestJs service, `frontend-application` UI ReactJs and `client directory` containg react build files. Served from NestJs service.

# Service

NestJs backend service containing `file_dist` directory where program files are placed to analyze, the `root.prog` here should be placed at root level in `file_dist` directory.

## Instructions

Clone repository

- Run `$ npm i` and then `$ npm run build` in `frontend`

- Run `$ npm i` and then `$ npm start` in `service`

Service start and listining at port `3000`

## How to use?

Visit `localhost:3000` in your browser and a simple page is rendered

`input text field for source path directory`
e.g. `/Users/sagheer/Downloads/challenge-SA/examples/example3` to the program directory

enter a valid path to the directory and press `Button: Transfer & process` it will copy files to the target `service/files_dist` and after processing the imported libraries will be listed in Tree format.
i.e.

    root.prog
        library1.lib
        library2.lib
            library3.lib

## Rest endpoint

`POST: localhost/api/scan-imports` with request body `{sourceDirectory:string}`

## Possible edge cases

Format other than `import path/to/library.lib;` is not supported, e.g. `import * from path/to/library.lib;`(Invalid).

- if a library is imported in a file and that library itself is missing in the transfered directory, an error message will be thrown.
- considering the program file name should be `root.prog`, otherwise it will not be processed. However the name can be updated in utils.ts `DEFAULT_ROOT_FILE_NAME` const. However if the filename is frequently changing then a new property can be added to the request body and adjustment will be needed in service.

## Software design

Algorithm steps

- Copies directory containing `root.prog` including its referencing libraries from a path to service directory `file_dist`
- Read file `root.prog` line by line
- Record only lines started with `imports` and keep them in an array. array containg paths to the referencing lib files.
- Recursivily read the referencing lib files from the array from previouse step and retrieve the referencing imports unless no referecing file left terminate Recursive call
- Formate response and return the Json response to UI
