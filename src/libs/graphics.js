export function extend(Graphics) {
    Graphics.prototype.drawDashLine = function(toX, toY, dash = 16, gap = 8) {
        const lastPosition = this.currentPath.shape.points;

        const currentPosition = {
            x: lastPosition[lastPosition.length - 2] || 0,
            y: lastPosition[lastPosition.length - 1] || 0,
        };

        const absValues = {
            toX: Math.abs(toX),
            toY: Math.abs(toY),
        };

        for (; Math.abs(currentPosition.x) < absValues.toX || Math.abs(currentPosition.y) < absValues.toY; ) {
            currentPosition.x = Math.abs(currentPosition.x + dash) < absValues.toX ? currentPosition.x + dash : toX;
            currentPosition.y = Math.abs(currentPosition.y + dash) < absValues.toY ? currentPosition.y + dash : toY;

            this.lineTo(currentPosition.x, currentPosition.y);

            currentPosition.x = Math.abs(currentPosition.x + gap) < absValues.toX ? currentPosition.x + gap : toX;
            currentPosition.y = Math.abs(currentPosition.y + gap) < absValues.toY ? currentPosition.y + gap : toY;

            this.moveTo(currentPosition.x, currentPosition.y);
        }
    };
    Graphics.prototype.drawDashedRect = function(x, y, w, h, rotation, dash, gap, offsetPercentage) {
        let polygons = [
            { x: 0, y: 0 },
            { x: w, y: 0 },
            { x: w, y: h },
            { x: 0, y: h },
        ];
        this.drawDashedPolygon(polygons, x, y, rotation, dash, gap, offsetPercentage);
    };
    Graphics.prototype.drawDashedPolygon = function(polygons, x, y, rotation, dash, gap, offsetPercentage) {
        var i;
        var p1;
        var p2;
        var dashLeft = 0;
        var gapLeft = 0;
        if (offsetPercentage > 0) {
            var progressOffset = (dash + gap) * offsetPercentage;
            if (progressOffset < dash) dashLeft = dash - progressOffset;
            else gapLeft = gap - (progressOffset - dash);
        }
        var rotatedPolygons = [];
        for (i = 0; i < polygons.length; i++) {
            var p = { x: polygons[i].x, y: polygons[i].y };
            var cosAngle = Math.cos(rotation);
            var sinAngle = Math.sin(rotation);
            var dx = p.x;
            var dy = p.y;
            p.x = dx * cosAngle - dy * sinAngle;
            p.y = dx * sinAngle + dy * cosAngle;
            rotatedPolygons.push(p);
        }
        for (i = 0; i < rotatedPolygons.length; i++) {
            p1 = rotatedPolygons[i];
            if (i == rotatedPolygons.length - 1) p2 = rotatedPolygons[0];
            else p2 = rotatedPolygons[i + 1];
            var dx = p2.x - p1.x;
            var dy = p2.y - p1.y;
            var len = Math.sqrt(dx * dx + dy * dy);
            var normal = { x: dx / len, y: dy / len };
            var progressOnLine = 0;
            this.moveTo(x + p1.x + gapLeft * normal.x, y + p1.y + gapLeft * normal.y);
            while (progressOnLine <= len) {
                progressOnLine += gapLeft;
                if (dashLeft > 0) progressOnLine += dashLeft;
                else progressOnLine += dash;
                if (progressOnLine > len) {
                    dashLeft = progressOnLine - len;
                    progressOnLine = len;
                } else {
                    dashLeft = 0;
                }
                this.lineTo(x + p1.x + progressOnLine * normal.x, y + p1.y + progressOnLine * normal.y);
                progressOnLine += gap;
                if (progressOnLine > len && dashLeft == 0) {
                    gapLeft = progressOnLine - len;
                } else {
                    gapLeft = 0;
                    this.moveTo(x + p1.x + progressOnLine * normal.x, y + p1.y + progressOnLine * normal.y);
                }
            }
        }
    };
}
