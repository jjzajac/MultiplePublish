#! /usr/bin/env node
import { promises as fs } from 'fs';
import { spawnSync } from 'child_process';

enum TYPE_VALUE {
    github = "github",
    npm = "npm",
}

interface PackagePublish {
    type: TYPE_VALUE;
    access: string;
    scope: string | "";
    registry?: string;
}

interface Package {
    name: string;
    multiplePublish: PackagePublish[];
}

const publish = (access: string, registry: string | null = null) => {
    let arg = ["publish", "--access", access];
    if (registry) {
        arg.push("--registry", registry);
    }
    console.log(arg);

    const manager = "npm";

    let ls = spawnSync(manager, arg);

    console.log(`stdout: ${ls.stdout.toString()}`);
};

const github = async (json: Package, element: PackagePublish, pathFile: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        if (!json.name.startsWith("@")) {
            json.name = `${element.scope}/${json.name}`;
        }

        await fs.writeFile(pathFile, JSON.stringify(json))

        publish(element.access, element.registry);

        resolve();
    })
}

const cleanup = async (json: Package, pathFile: string, name: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        json.name = name;

        await fs.writeFile(pathFile, JSON.stringify(json, null, 2));
        resolve();
    })
};

const npm = async (element: PackagePublish): Promise<void> => {
    return new Promise(async (resolve, reject) => {

        publish(element.access, element.registry);

        resolve();
    })
};



const main = async () => {
    try {
        const pathFile: string = process.cwd() + "/package.json";

        let json: Package = require(pathFile);

        const name = json.name;

        if (json.multiplePublish) {

            // https://www.coreycleary.me/why-does-async-await-in-a-foreach-not-actually-await/
            for (let element of json.multiplePublish) {

                switch (element.type) {
                    case TYPE_VALUE.github:
                        await github(json, element, pathFile);

                        await cleanup(json, pathFile, name);
                        break;

                    case TYPE_VALUE.npm:
                        await npm(element);
                        break;

                    default:
                        throw new Error(`unknown type${element.type}`);
                }
            }
        }
        else {
            throw new Error("multiple-publish options doesn't appear in package.json");
        }
    } catch (error) {
        console.log(error);
    }

}

main();


