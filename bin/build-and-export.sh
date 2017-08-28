#!/bin/bash

gulp prod build
tar -zcvf "/scp/install.synergycp.com/bm/theme/default/admin.tar.gz" --transform 's,^public,admin,' public
