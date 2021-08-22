import tl = require('azure-pipelines-task-lib/task');
import * as rm from 'typed-rest-client/RestClient';

interface BaneResponse {
    code: number,
    system_id: number,
    url: string,
    results: {
        total_files_scanned: number,
        total_lines_scanned: number,
        total_dangerous_bugs: number,
        total_of_attention_points: number
    },
    total_time_running: number,
    message: string | undefined
}

async function run() {
    try {
        const tokenInput: string | undefined = tl.getInput('token', true);
        
        if (!tokenInput) {
            tl.setResult(tl.TaskResult.Failed, 'Token input wasn`t given', true);
            return;
        }
        
        let rest: rm.RestClient = new rm.RestClient('rest-sample', 'http://bane.loc');
        let res: rm.IRestResponse<BaneResponse> = await rest.get<BaneResponse>(`/public/hook/greeting?token=${tokenInput}`);
        const body = res.result || undefined

        if (res.statusCode != 200 || !body) {
            tl.setResult(tl.TaskResult.Failed, 'The token passed does not match any project.', true);
            return;
        }

        let message = 'Ops, we have a serious problem. Check in our dash what the problem was found and how to solve it by accessing the URL given above.';
        
        if (body?.results?.total_dangerous_bugs > 0) {
            console.log(result(body, message));
            tl.setResult(tl.TaskResult.Failed, message, true);
            return;
        }

        message = 'Analyze complete, Congratulations, your application does not contain any major flaws.';

        console.log(result(body, message));
    }
    catch (err) {
        console.log("err: ", err)
        tl.setResult(tl.TaskResult.Failed, err.message, true);
        return;
    }
}

function result(body: BaneResponse, message: string) {
    return {
        url: body.url,
        results: {
            total_files_scanned: body.results.total_files_scanned,
            total_lines_scanned: body.results.total_lines_scanned,
            total_dangerous_bugs: body.results.total_dangerous_bugs,
            total_of_attention_points: body.results.total_of_attention_points
        },
        total_time_running: body.total_time_running,
        message: message
    }
}

run();