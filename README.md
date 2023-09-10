## Description

A utility tool developed in NestJs and ReactJs that takes as input a path to a directory containing a root program. the tool transfer directory to the target folder, then parse the program and display the structure of the imports, for example, in the following format:

    root.prog
        library1.lib
        library2.lib
            library3.lib

## Considerations

To parse program and get the expected results, the utility support programs and libraries with imports in following formats

These have the form

    import path/to/library.lib;

These should always contain a `root.prog` file, which is the program we want to analyze and its name should be `root.prog`

## Design

Source code contains `service` backend NestJs service, `frontend` UI ReactJs and `client` containg react build files, served by NestJs service.

# Service

NestJs backend service containing `file_dist` directory where program files are placed to analyze, the `root.prog` here should be placed at root level here in `file_dist` directory.

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

## Possible edge cases

Format other than `import path/to/library.lib;` is not supported, e.g. `import * from path/to/library.lib;`(Invalid).

- if a library is imported in a file and that library itself is missing in the transfered directory, an error message will be thrown.
- considering the program file name should be `root.prog`, otherwise it will not be processed. However the name can be updated in the `DefaultRootFileName` const. However if the filename is frequently changing then a new params can be introduced in the request model.
