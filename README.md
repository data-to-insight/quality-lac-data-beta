# Quality LAC data beta: Pyodide powered front-end

![Build & Test](https://github.com/SocialFinanceDigitalLabs/quality-lac-data-beta-validator/actions/workflows/deploy.yaml/badge.svg)

*We want to build a tool that improves the quality of data on Looked After Children so that Children’s Services Departments have all the information needed to enhance their services.*

We believe that a tool that highlights and helps fixing data errors would be valuable for:

1.   Reducing the time analysts, business support and social workers spend cleaning data.
2.   Enabling leadership to better use evidence in supporting Looked After Children.

## About this project

The aim of this project is to deliver a tool to relieve some of the pain-points
of [reporting and quality][qlac-blog] in children's services data. This project
focuses, in particular, on data on looked after children (LAC) and the
[SSDA903][dfe-903] return.

The project consists of a number of related pieces of work:

* [Hosted Tool][qlac]
* [React & Pyodide Front-End][qlac-front-end] [this repo]
* [Python Validator Engine & Rules][qlac-engine]
* [Local Authority Reference Data][qlac-ref-la]
* [Postcode Reference Data][qlac-ref-pc]

The core parts consist of a [Python][python] validator engine and rules using
[Pandas][pandas] with [Poetry][poetry] for dependency management. The tool is targeted
to run either standalone, or in [pyodide][pyodide] in the browser for a zero-install
deployment with offline capabilities.

It provides methods of finding the validation errors defined by the DfE in 903 data.
The validator needs to be provided with a set of input files for the current year and,
optionally, the previous year. These files are coerced into a common format and sent to
each of the validator rules in turn. The validators report on rows not meeting the rules
and a report is provided highlight errors for each row and which fields were included in
the checks.


## Compiling

To get started, you need [yarn][yarn] and a recent version of [node][nodejs].

Install dependencies and deploy a test version:

```
yarn install
yarn start
```

The front-end should automatically re-load when changes are made, but if not,
simply reload. You don't need to run `yarn install` again unless you have changed
dependencies.

## Configuration

The version of the validator is set through the [.env][./.env] file:

```
REACT_APP_VALIDATOR_RELEASE=quality-lac-data-validator==x.x.x
```

(where x.x.x is the target release)

To use a development version of the validator, copy the [python wheel][python-wheel]
to the public folder of this project, then create a file called .env.local and
add the following line:

```env
REACT_APP_VALIDATOR_RELEASE=http://<hostname>:<port>/quality_lac_data_validator-<x.x.x>-py3-none-any.whl
```

Where hostname and port are the hostname and port as appearing in your development server,
e.g.

```
Compiled successfully!

You can now view quality-lac-data-beta in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.86.31:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```


[qlac-blog]: https://www.socialfinance.org.uk/blogs/better-data-children-care-building-common-approach
[dfe-903]: https://www.gov.uk/guidance/children-looked-after-return-guide-to-submitting-data

[python]: https://www.python.org/
[pandas]: https://pandas.pydata.org/
[poetry]: https://python-poetry.org/
[pyodide]: https://pyodide.org/en/stable/
[semver]: https://semver.org/

[yarn]: https://yarnpkg.com/
[nodejs]: https://nodejs.org/en/
[python-wheel]: https://realpython.com/python-wheels/

[qlac]: https://sfdl.org.uk/quality-lac-data-beta/
[qlac-front-end]: https://github.com/SocialFinanceDigitalLabs/quality-lac-data-beta
[qlac-engine]: https://github.com/SocialFinanceDigitalLabs/quality-lac-data-beta-validator
[qlac-ref-la]: https://github.com/SocialFinanceDigitalLabs/quality-lac-data-ref-authorities
[qlac-ref-pc]: https://github.com/SocialFinanceDigitalLabs/quality-lac-data-ref-postcodes
