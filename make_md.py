#!/usr/bin/env python3
import subprocess
import glob

sidebar_label = "sidebar_label: Overview\n"
toc = "hide_table_of_contents: True\n"
title = "hide_title: true\n"
sidebar = "hide_sidebar: true\n"
import1 = "import useBaseUrl from \"@docusaurus/useBaseUrl\";\n"
import2 = "import Redocusaurus from \"@theme/Redocusaurus\";\n\n"


for file in glob.glob("static/oas/expander/*.yml"):
    path = file.split('static')[1]
    print(path)
    oas_name = file.split('static/oas/expander/')[1].lower().replace(".json", "")
    file_name = "api/expander/" + oas_name + ".mdx"
    print(file_name)
    docid = "id: " + oas_name + "\n"
    redoc = "<Redocusaurus spec={useBaseUrl(\"" + path + "\")} />"
    f = open(file_name, "w+")
    f.write("---\n")
    f.write(docid)
    f.write(sidebar_label)
    f.write(toc)
    f.write(title)
    f.write(sidebar)
    f.write("---\n")
    f.write(import1)
    f.write(import2)
    f.write(redoc)
#.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
